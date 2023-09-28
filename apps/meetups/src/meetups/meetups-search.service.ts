import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

import type { Meetup } from '@models';

@Injectable()
export class MeetupsSearchService {
	constructor(private readonly elasticsearchService: ElasticsearchService) {}

	async searchByName(name: string) {
		const results = await this.elasticsearchService.search<Meetup>({
			index: 'meetups',
			body: {
				query: {
					bool: {
						should: [
							{
								wildcard: {
									name: {
										value: '*' + name + '*',
										boost: 1.0,
										rewrite: 'constant_score',
									},
								},
							},
							{
								match: {
									name: {
										query: name,
										operator: 'and',
										fuzziness: 'auto',
									},
								},
							},
							{
								match_phrase: {
									name: {
										query: name,
										slop: 3,
									},
								},
							},
						],
					},
				},
			},
		});

		return results.hits.hits.map((el) => el._source);
	}
}
