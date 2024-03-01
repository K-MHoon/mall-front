import jwtAxios from "../util/jwtUtil";

// export const API_SERVER_HOST = "http://localhost:5000";
export const API_SERVER_HOST =
    "http://APIServer1-env.eba-nmn37ayw.ap-northeast-2.elasticbeanstalk.com";

const prefix = `${API_SERVER_HOST}/api/todo`;

export const getOne = async (tno) => {
    const res = await jwtAxios.get(`${prefix}/${tno}`);
    return res.data;
};

export const getList = async (pageParam) => {
    const { page, size } = pageParam;
    const res = await jwtAxios.get(`${prefix}/list`, {
        params: { page: page, size: size },
    });
    return res.data;
};

export const postAdd = async (todoObj) => {
    const res = await jwtAxios.post(`${prefix}/`, todoObj);
    return res.data;
};

export const deleteOne = async (tno) => {
    const res = await jwtAxios.delete(`${prefix}/${tno}`);
    return res.data;
};

export const putOne = async (todo) => {
    const res = await jwtAxios.put(`${prefix}/`, todo);
    return res.data;
};
