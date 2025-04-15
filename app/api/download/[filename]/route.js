import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request, { params }) {
  const { filename } = params;
  const filePath = path.join(process.cwd(), 'lib/mock-data.ts', filename); // Adjust the path

  try {
    const file = await fs.readFile(filePath);

    const headers = new Headers();
    headers.append('Content-Disposition', `attachment; filename="${filename}"`);
    headers.append('Content-Length', file.length);
    headers.append('Content-Type', 'application/octet-stream'); // Adjust content type

    return new NextResponse(file, { headers });
  } catch (error) {
    console.error('Error downloading file:', error);
    return new NextResponse('File not found.', { status: 404 });
  }
}