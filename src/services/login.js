import request from '@/utils/request';

export async function AccountLogin(params) {
  console.log(params);
  // return request('/auth/login', {

  const data = new FormData();
  for (var key in params) {
    data.append(key, params[key]);
  }

  console.log(data);
  return request('/api/manager/login', {
    method: 'POST',
    headers: {
      Authorization: 'Basic Og==',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  });
}

export async function AccountSignUp(params) {
  return request('/api/manager/register', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
