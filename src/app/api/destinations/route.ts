import { NextResponse } from "next/server";
import { defaultDestinations } from "@/data/destinations";

export async function GET() {
  return NextResponse.json(defaultDestinations);
}
