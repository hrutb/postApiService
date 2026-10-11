import { Component, OnInit } from '@angular/core';
import { Ipost } from '../../model/post.model';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {

  constructor(private _postService:PostService) { }





  postArr:Ipost[] =[];
  ngOnInit(): void {
        this.getPosts();
  }

trackPost(index:number, post:Ipost){
     return post.id;
}
  getPosts(){
         this._postService.fetchPost()
           .subscribe({
              next:res=>{
                     this.postArr=res ;
              },
              error:err=>{
                      console.log(err);
              }
           })
   }



 getNewPost(newObj:Ipost){
      this.postArr.unshift(newObj);
    }


    onRemove(id:number){
             let getIndex = this.postArr.findIndex(r=>r.id===id);
               this.postArr.splice(getIndex,1);
    }

    onUpdate(updateObj:Ipost){
          let getIndex= this.postArr.findIndex(ele=>ele.id===updateObj.id);
            this.postArr[getIndex]=updateObj;
    }
}
