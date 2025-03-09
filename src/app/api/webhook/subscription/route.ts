export const dynamic = "force-dynamic";
import { client } from "@/lib/prisma";
import { NextRequest } from "next/server";
import crypto from "node:crypto";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const body = JSON.parse(rawBody);

    const { buyerUserId } = body.meta.custom_data;

    if (!buyerUserId) {
      throw new Error("Invalid buyerUserId or ID does not exist.");
    }

    const hmac = crypto.createHmac(
      "sha256",
      process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!
    );
    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
    const signature = Buffer.from(req.headers.get("X-Signature") || "", "utf8");

    console.log("digest:", digest);
    console.log("signature:", signature);

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error("Invalid signature.");
    }

    const buyer = await client.user.update({
      where: {
        id: buyerUserId,
      },
      data: {
        subscription: true,
      },
    });

    if (!buyer) {
      return Response.json({
        status: 404,
        message: "Cannot update the subscription",
      });
    }

    return Response.json({
      status: 200,
      data: buyer,
    });
  } catch (error) {
    return Response.json({
      status: 500,
      message: "Internal server error",
    });
  }
}
