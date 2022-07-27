

/**
 * 筛选参数: 授权用户负责的(assigned)，授权用户创建的(created)，包含前两者的(all)。默认: assigned
 */
export enum QueryFilter {
    ASSIGNED = "assigned",
    CREATED = "created",
    ALL = "all",
}

/**
 * Issue的状态: open（开启的）, progressing(进行中), closed（关闭的）, rejected（拒绝的）。 默认: open
 */
export enum IssueState {
    OPEN = "open",
    CLOSED = "closed",
    REJECTED = "rejected",
    ALL = "all",
    PROGRESSING = "progressing",
}

export enum IssueDirection {
    DESC = "desc",
    ASC = "asc",
}

export enum IssueSort {
    CREATED = "created",
    UPDATED = "updated",
}


