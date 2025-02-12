import { afterEach, describe, expect, it, vi } from 'vitest';
import { postSignin, postSignup, getSigninValidation } from './auth';
import axios from 'axios';

vi.mock('axios', () => {
  const axiosMock = {
    get: vi.fn(),
    put: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  };
  return { ...axiosMock, default: axiosMock };
});

afterEach(() => vi.resetAllMocks());

const BASE_URL = import.meta.env.VITE_AUTH_BASE;

describe('postSignup', () => {
  it('calls the correct Axios method with the correct arguments', async () => {
    const END_POINT = import.meta.env.VITE_AUTH_SIGN_UP;
    const options = { headers: { 'Content-Type': 'application/json' } };
    const url = `${BASE_URL}${END_POINT}`;
    const body = new FormData();
    await expect(postSignup(body)).resolves.not.toThrowError();
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenLastCalledWith(url, body, options);
  });
});

describe('postSignin', () => {
  it('calls the correct Axios method with the correct arguments', async () => {
    const END_POINT = import.meta.env.VITE_AUTH_SIGN_IN;
    const options = { headers: { 'Content-Type': 'application/json' } };
    const url = `${BASE_URL}${END_POINT}`;
    const body = new FormData();
    await expect(postSignin(body)).resolves.not.toThrowError();
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenLastCalledWith(url, body, options);
  });
});

describe('getSigninValidation', () => {
  it('calls the correct Axios method with the correct arguments', async () => {
    const END_POINT = import.meta.env.VITE_AUTH_SIGN_IN_VALIDATION;
    const TOKEN = '<token>';
    const url = `${BASE_URL}${END_POINT}`;
    const options = { headers: { token: TOKEN } };
    await expect(getSigninValidation(TOKEN)).resolves.not.toThrowError();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenLastCalledWith(url, options);
  });
});
