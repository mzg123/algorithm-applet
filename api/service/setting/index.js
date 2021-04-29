import { base } from '../../base';
import { urls } from '../../config';

export async function setSecurityCode(data) {
  return await base.request(urls.setSecurityCode,data, {apiType: 'financial'});
}