import { base } from '../base';
import { urls } from '../config';

export async function getCarrierList(data) {
  return await base.post(urls.sendApply,data);
}
