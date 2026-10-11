import { Injectable } from '@angular/core';
import { Identifier } from './../../../../node_modules/@types/estree/index.d';
import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { envrionemnt } from 'src/environments/environment';
// import { Iproduct } from '../model/product.model';
import { map, Subject } from 'rxjs';
// import { Ipost } from '../model/post.model';
import { environment } from 'src/environments/environment';
import { Ipost } from '../model/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private _httpService:HttpClient) { }

  private readonly  POST_BASE =environment.Post_base;
  private readonly post_url = `${this.POST_BASE}/posts`

      editOBj$= new Subject<Ipost>();


  fetchPost(){
      return this._httpService.get<Ipost[]>(this.post_url)
    }


  createPost(newObj:Ipost){
             return this._httpService.post<Ipost>(this.post_url,newObj);

    }


  onEdit(postObj:Ipost){
         this.editOBj$.next(postObj);
  }

  updatePost(updateObj:Ipost){
      return this._httpService.put<Ipost>(`${this.post_url}/${updateObj.id}`,updateObj);
  }


  getPostById(getId:number){
      return this._httpService.get<Ipost>(`${this.post_url}/${getId}`);
  }


  deletePost(removeId:number){
       return this._httpService.delete<Ipost>(`${this.post_url}/${removeId}`);
  }




}

