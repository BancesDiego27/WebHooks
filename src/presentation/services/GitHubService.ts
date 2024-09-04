import { GithubIssuePayload, GithubStarPayload } from "../../interfaces";

export class GitHubService{
    constructor(){}

    onStar( payload: GithubStarPayload): string {
        let message : string
        const {action,sender,repository,starred_at} = payload
        console.log(starred_at)

        if(starred_at){
            message = `User ${sender.login}  ${action} star on ${repository.full_name}`
        }else{
            message = `User ${sender.login}  ${action} destar on ${repository.full_name}`
        }


        return message
    }

    onIssue(payload:GithubIssuePayload):string {
        const {action,issue} = payload
        let message : string = `Unhandeled action for the issue event ${action}`
        
        if(action === 'opened'){
             message = `An issue was opened with this title ${issue.title}`
        }
        if(action === 'closed'){
            message = `An issue was closed by ${issue.user.login}`
        }
        if(action === 'reopened'){
            message = `An issue was reopened with this title ${issue.title} by ${issue.user.login} `
        }
        
        
        return message
    }
    
}