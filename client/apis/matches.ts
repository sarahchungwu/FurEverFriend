import request from 'superagent'
import { MatchList } from '../../models/matches'

const rootUrl = '/api/v1/'

export async function fetchMatchList(
  token: string,
  dogId: number,
): Promise<MatchList[]> {
  const res = await request
    .get(rootUrl + `dogs/${dogId}/matches`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')

  return res.body
}
