import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/business?userId=xxx - Check if user has a business account
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId parameter' },
        { status: 400 }
      );
    }

    const business = await prisma.business.findUnique({
      where: { userId },
    });

    if (!business) {
      return NextResponse.json({ hasBusiness: false, business: null });
    }

    return NextResponse.json({ hasBusiness: true, business });
  } catch (error) {
    console.error('Error checking business:', error);
    return NextResponse.json(
      { error: 'Failed to check business status' },
      { status: 500 }
    );
  }
}

// POST /api/business - Register a new business
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      userId, 
      businessName, 
      businessType, 
      businessNumber, 
      phone, 
      address, 
      description 
    } = body;

    if (!userId || !businessName || !businessType || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, businessName, businessType, phone' },
        { status: 400 }
      );
    }

    // Check if user already has a business
    const existingBusiness = await prisma.business.findUnique({
      where: { userId },
    });

    if (existingBusiness) {
      return NextResponse.json(
        { error: 'User already has a business account' },
        { status: 409 }
      );
    }

    // Generate random logo color
    const colors = [
      'bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-pink-600',
      'bg-orange-600', 'bg-teal-600', 'bg-indigo-600', 'bg-red-600',
    ];
    const logoColor = colors[Math.floor(Math.random() * colors.length)];

    const business = await prisma.business.create({
      data: {
        userId,
        businessName,
        businessType,
        businessNumber: businessNumber || null,
        phone,
        address: address || null,
        description: description || null,
        logoColor,
        isApproved: true, // Auto-approve for now
      },
    });

    return NextResponse.json(business, { status: 201 });
  } catch (error) {
    console.error('Error creating business:', error);
    return NextResponse.json(
      { error: 'Failed to create business' },
      { status: 500 }
    );
  }
}
