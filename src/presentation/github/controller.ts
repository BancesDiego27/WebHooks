import { Request, Response } from "express";
import { GitHubService } from "../services/GitHubService";
import { DiscordService } from "../services/DiscordService";

export class GithubController {
    constructor(
      private readonly gitHubService = new GitHubService(),
      private readonly discordService = new DiscordService(),

    ){}

    webhookHandler = (req:Request,res:Response) =>{
        const gitHubEvent = req.header('x-github-event') ?? 'unknown'
      //  const signature = req.header('x-hub-signature-256') ?? 'unknown'
      let message: string
        const payload = req.body
        switch(gitHubEvent){
          case 'star':
           message =  this.gitHubService.onStar(payload)
           
           break
           case 'issues':
            message =  this.gitHubService.onIssue(payload)
            break
          default: 
            message = `Unknown event ${gitHubEvent}`
        }
        this.discordService.notify(message).then(()=> res.status(202).send("Accepted")).catch(()=> res.status(500).send("Error"))
        console.log({message})
    }
}