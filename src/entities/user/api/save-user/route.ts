import { NextResponse } from 'next/server';

import { saveUserIfNotExists } from '../../model/saveUser';

export const POST = async (req: Request) => {
  const { userToSave } = await req.json();

  try {
    const result = await saveUserIfNotExists(userToSave);
    if (result.alreadyExists) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: 'User saved successfully.' },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.message === 'Invalid user data') {
      return NextResponse.json(
        { message: 'Invalid user data' },
        { status: 400 }
      );
    }
    console.error('Error saving user:', error);
    return NextResponse.json(
      { message: 'Something went wrong. Try again later.' },
      { status: 500 }
    );
  }
};
