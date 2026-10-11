// import { Component, OnInit } from '@angular/core';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// import { Iproduct } from '../../model/product.model';
import { Ipost } from '../../model/post.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';
import { PostService } from '../../service/post.service';
// import { SnackbarService } from '../../service/snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from '../../service/snackbar.service';



@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
@Input()  postObj!:Ipost;
      @Output() editObj  = new EventEmitter<Ipost>();
      @Output() removeObjId = new EventEmitter<number>()

constructor(private _matDialog:MatDialog, private _postServ:PostService ,private _snackbar:SnackbarService){}

ngOnInit(): void {
}


    OnRemove(id:number){
          //  this.removeObj.emit(this.postObj.id);
                    // let getIndex =this.postArr.findIndex(ele=>ele.id===removeId);
              let config = new MatDialogConfig();
                    config.width='800px';
                    config.height='150px';

         let _matDialogRef = this._matDialog.open(GetConfirmComponent,config);

              _matDialogRef.afterClosed()
                               .subscribe(flag=>{
                                        if(flag){
                                             this._postServ.deletePost(id).subscribe({
                                                  next:res=>{
                                                     console.log(res);
                                                      this.removeObjId.emit(id);
                                                    this._snackbar.Snackbar('Delete sucessfullly')
                                                  },
                                                  error:err=>{
                                                    this._snackbar.Snackbar('failed to delete');

                                                  }
                                            })
                                        }
                               })
    }

  onEditObj(postObj:Ipost){
      this._postServ.editOBj$.next(postObj);
    }

}
