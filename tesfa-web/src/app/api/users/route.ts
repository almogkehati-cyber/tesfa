import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/users - Fetch all users for the contacts list
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        walletAddress: true,
        fullName: true,
        phoneSuffix: true,
        avatarColor: true,
      },
      orderBy: {
        fullName: 'asc',
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST /api/users - Create or update a user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, walletAddress, fullName, phoneSuffix, avatarColor } = body;

    if (!id || !walletAddress || !fullName || !phoneSuffix) {
      return NextResponse.json(
        { error: 'Missing required fields: id, walletAddress, fullName, phoneSuffix' },
        { status: 400 }
      );
    }

    // Generate a random avatar color if not provided
    const colors = [
      'bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-pink-600',
      'bg-orange-600', 'bg-teal-600', 'bg-indigo-600', 'bg-red-600',
    ];
    const color = avatarColor || colors[Math.floor(Math.random() * colors.length)];

    const user = await prisma.user.upsert({
      where: { id },
      update: {
        walletAddress,
        fullName,
        phoneSuffix,
        avatarColor: color,
      },
      create: {
        id,
        walletAddress,
        fullName,
        phoneSuffix,
        avatarColor: color,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error creating/updating user:', error);
    return NextResponse.json(
      { error: 'Failed to create/update user' },
      { status: 500 }
    );
  }
}
