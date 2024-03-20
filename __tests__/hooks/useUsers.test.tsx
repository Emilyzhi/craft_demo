import { act, render,renderHook} from '@testing-library/react';
import useSWR from 'swr';
import useUsers from '../../hooks/useUsers';

jest.mock('swr');

describe("useUsers", () => {
    it("should make a call to the API and return the message", async () => {
        // 模拟 useSWR 返回的数据
        const responseData = { message: "Test" };
        useSWR.mockReturnValue({ data: responseData, error: null, isLoading: false });

        // 渲染组件
        let hook;
        await act(async () => {
            hook = renderHook(() => useUsers("/api/users"));
        });

        // 检查结果
        const { result } = hook;
        expect(result.current.data).toEqual(responseData); // 检查返回的数据是否正确
        expect(result.current.isLoading).toEqual(false); // 检查 isLoading 是否为 false
        expect(result.current.error).toEqual(null); // 检查 error 是否为 null
    });
});
