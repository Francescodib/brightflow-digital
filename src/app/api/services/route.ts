import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Service from '@/models/Service';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate ogni ora

export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({ active: true }).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch services',
      },
      { status: 500 }
    );
  }
}
