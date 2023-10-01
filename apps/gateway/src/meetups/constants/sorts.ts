export enum MeetupQueryValueType {
	ASCENDING = 'ascending',
	DESCENDING = 'descending',
}
export type MeetupSortType = 'ASC' | 'DESC';

export const meetupSortTypes: Record<MeetupQueryValueType, MeetupSortType> = {
	ascending: 'ASC',
	descending: 'DESC',
};

export const meetupSortQueryValues: MeetupQueryValueType[] = Object.keys(meetupSortTypes) as MeetupQueryValueType[];
