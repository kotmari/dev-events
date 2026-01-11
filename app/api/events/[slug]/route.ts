import { IEvent } from "@/database";
import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    await connectDB();

    const { slug } = await params;
    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        { message: "Invalid or massing slug parameter" },
        { status: 400 }
      );
    }

    const sanitizedSlug = slug.trim().toLocaleLowerCase();

    const event = await Event.findOne({
      slug: sanitizedSlug,
    }).lean();

    if (!event) {
      return NextResponse.json(
        { message: `Event with slug ${sanitizedSlug} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 }
    );
  } catch (error) {
      if(process.env.NODE_ENV === 'development'){
         console.error('Error fetching event by slug:', error)
      }

      if(error instanceof Error) {
         if(error.message.includes("MONGODB_URI")){
            return NextResponse.json(
               {message: "Data base configuration error"},
               {status: 500}
            )
         }
         return NextResponse.json(
            {message: 'Failed to fetch event', error: error.message},
            {status: 500}
         )
      }

      return NextResponse.json(
         {message: "An unexpected error occurred"},
         {status: 500}
      )
  }
}
