import * as Prismic from '@prismicio/client';
import sm from '../../sm.json';

export function getPrismicClient(req?: unknown) {
	const repositoryName = sm.apiEndpoint;
	const prismic = Prismic.createClient(repositoryName, { accessToken: process.env.PRISMIC_ACCESS_TOKEN });

	return prismic;
}
