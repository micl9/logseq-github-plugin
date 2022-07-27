import axios from "axios";
import {IssueDirection, IssueSort, IssueState, QueryFilter} from "./repository-provider";
import {Issue} from "./types";


let axiosIns = axios.create({
    baseURL: "https://gitee.com",
    timeout: 30000
});

export type IssueRequest = {
    access_token: string,
    filter?: QueryFilter,
    state?: IssueState,
    sort?: IssueSort,
    direction?: IssueDirection,

    /**
     * 当前的页码
     */
    page?: number

    /**
     * 每页的数量，最大为 100
     */
    per_page?: number

    /**
     * 起始的更新时间，要求时间格式为 ISO 8601
     */
    since?: string

    /**
     * 用逗号分开的标签。如: bug,performance
     */
    labels?: string

    /**
     * 计划开始日期，格式：20181006T173008+80-20181007T173008+80（区间
     */
    schedule?: string

    /**
     * 计划截止日期，格式同上
     */
    deadline?: string

    /**
     * 任务创建时间，格式同上
     */
    created_at?: string

    /**
     * 任务完成时间，即任务最后一次转为已完成状态的时间点。格式同上
     */
    finished_at?: string
}

export async function findAllIssuesByState(
    opts: IssueRequest
): Promise<Issue[]> {
    const resp = await axiosIns.get("/api/v5/user/issues", {
        params: {
            filter: QueryFilter.ALL,
            state: IssueState.OPEN,
            sort: IssueSort.CREATED,
            direction: IssueDirection.DESC,
            ...opts
        }
    })
    return await resp.data
}
