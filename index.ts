import '@logseq/libs';
import {BlockEntity, PageEntity, SettingSchemaDesc} from '@logseq/libs/dist/LSPlugin.user';
import {findAllIssuesByState} from "./request";
import {Issue} from "./types";


let cliveToken = "d4750b612eb6af6b4927198e01baafb7";

let blockSet: Set<number> = new Set;

let settings: SettingSchemaDesc[] = [
    {
        key: "AccessToken",
        type: "string",
        title: "Enter github personal access token",
        description: "Enter your personal access token here",
        default: "Github Personal Access Token",
    },
    {
        key: "TargetPage",
        type: "string",
        title: "Enter target page",
        description: "Enter your desired page, to where the blocks will be inserted",
        default: "Gitee Issues"
    }
]

logseq.useSettingsSchema(settings)


function targetPageName(): string {
    return <string>logseq.settings!.TargetPage
}


function produceContent(result: Issue[]) {
    let blockContents = result.map((issue) => {
        return `[${issue.title}](${issue.html_url}) #${issue.issue_type} #${issue.number}  #${issue.state} #${issue.assignee?.name ?? '未分配'}`
    }).map(it => ({content: it}));
    return blockContents;
}


async function fetchGiteeIssues() {
    let result = await findAllIssuesByState({
        access_token: <string>logseq.settings!.AccessToken,
    });
    console.log(result);
    let blockContents = produceContent(result);
    let page = await logseq.Editor.getPage(targetPageName()) ?? await logseq.Editor.createPage(targetPageName(), {}, {redirect: true}) as PageEntity;
    let blockEntities = await logseq.Editor.getPageBlocksTree(targetPageName());
    let targetBlock = blockEntities[0];
    console.log(targetBlock)
    targetBlock = await logseq.Editor.insertBlock(targetBlock.uuid, '🚀 Fetching Gitee Issues ...', {before: true}) as BlockEntity;
    await logseq.Editor.insertBatchBlock(targetBlock.uuid, blockContents, {sibling: false})
    await logseq.Editor.updateBlock(targetBlock.uuid, `## 🔖 r/logseq - Genius-Pros`);
}


const main = async () => {
    logseq.Editor.registerSlashCommand('Github Sync', async (e) => {
            await fetchGiteeIssues()
        }
    )
}

logseq.ready(main).catch(console.error);
