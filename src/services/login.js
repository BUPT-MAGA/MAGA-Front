import request from '@/utils/request';

export async function AccountLogin(params) {
  return request('/auth/login', {
    method: 'POST',
    data: params,
  });
}

export async function AccountSignUp(params) {
    return request('/register', {
      method: 'POST',
      data: params,
    });
  }

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
