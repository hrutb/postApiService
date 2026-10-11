import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ipost } from '../../model/post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  constructor(private _postServ:PostService){}
        IsInEditMode:boolean = false;
       @Output()  newProdObj  = new EventEmitter<Ipost>();
       @ViewChild('postForm') postForm!:NgForm;
       @Output() emitUpdateObj =new EventEmitter<Ipost>();
       editId!:number


       ngOnInit(): void {
              this._postServ.editOBj$.subscribe({
                   next:res=>{
                        this.postForm.form.patchValue(res);
                        this.IsInEditMode= true;
                         this.editId= res.id;

                   },
                    error:err=>{
                                console.log(err);
                    }
              })

       }



     onAdd(){
          if(this.postForm.valid){

            let newObj={
                     ...this.postForm.form.value,
                     id:Date.now()
                  }
               console.log(newObj);
               this.newProdObj.emit(newObj);
                  this.postForm.reset();
          }
      }

  onUpdate(){
       let updateId=this.editId;
        if(this.postForm.form.valid){

          let updateObj= {
                ...this.postForm.form.value ,
                id:updateId
               }
          this.emitUpdateObj.emit(updateObj);
               this.postForm.reset();
               this.IsInEditMode=false;
        }
    }
}
