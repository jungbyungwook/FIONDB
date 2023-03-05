import { api } from 'src/pages/api';

import type { AxiosResponse } from 'axios';
import type {
  IMetaSpId,
  IMetaMatchType,
  IMetaDivision,
  IMetaSeasonId,
} from 'src/pages/api/type';
import { baseURL } from 'src/pages/api/url';

export const metaAPI = {
  getSoccerPlayerMeta: (): Promise<AxiosResponse<IMetaSpId[]>> =>
    api.get(baseURL.meta.getMetaSpId).then((response) => response.data),
  getMatchTypeMeta: (): Promise<AxiosResponse<IMetaMatchType[]>> =>
    api.get(baseURL.meta.getMetaMatchType),
  getMatchDivisionMeta: (): Promise<AxiosResponse<IMetaDivision[]>> =>
    api.get(baseURL.meta.getMetaDivision),
  getSeasonIdMeta: (): Promise<IMetaSeasonId[]> =>
    api.get(baseURL.meta.getMetaSeasonId).then((response) => response.data),
};
