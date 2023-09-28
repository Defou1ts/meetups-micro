import { Injectable } from '@nestjs/common';
import { createObjectCsvStringifier } from 'csv-writer';

import type { Meetup } from '@models';

@Injectable()
export class CsvService {
	generateMeetupsCsv(meetups: Meetup[]): string {
		const csvStringifier = createObjectCsvStringifier({
			header: [
				{ id: 'id', title: 'ID' },
				{ id: 'name', title: 'Name' },
				{ id: 'description', title: 'Description' },
				{ id: 'latitude', title: 'Latitude' },
				{ id: 'longitude', title: 'Longitude' },
				{ id: 'date', title: 'Date' },
				{ id: 'createdAt', title: 'Created At' },
				{ id: 'updatedAt', title: 'Updated At' },
			],
		});

		const csvData = [
			csvStringifier.getHeaderString(),
			...meetups.map(({ id, name, description, date, createdAt, updatedAt, latitude, longitude }) =>
				csvStringifier.stringifyRecords([
					{
						id,
						name,
						description,
						latitude,
						longitude,
						date: date.toISOString(),
						createdAt: new Date(createdAt).toISOString(),
						updatedAt: new Date(updatedAt).toISOString(),
					},
				]),
			),
		];

		return csvData.join('\n');
	}
}
