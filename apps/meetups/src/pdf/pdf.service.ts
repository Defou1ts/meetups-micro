import { Injectable } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const PDFDocument = require('pdfkit-table');

export interface PdfTableBufferOptions {
	title: string;
	headers: string[];
	rows: string[][];
}

@Injectable()
export class PdfService {
	async generatePdfTableBuffer({ title, headers, rows }: PdfTableBufferOptions): Promise<Buffer> {
		const pdfBuffer: Buffer = await new Promise((resolve) => {
			const doc = new PDFDocument({ margin: 30, size: 'A4' });

			doc.table({ title, subtitle: 'List', headers, rows });

			const buffer = [];
			doc.on('data', buffer.push.bind(buffer));
			doc.on('end', () => {
				const data = Buffer.concat(buffer);
				resolve(data);
			});
			doc.end();
		});

		return pdfBuffer;
	}
}
