import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SharedService} from "../../services/shared.service";

@Component({
  selector: 'app-recipe-add-popup',
  templateUrl: './recipe-add-popup.component.html',
  styleUrls: ['./recipe-add-popup.component.scss']
})
export class RecipeAddPopupComponent {
  showPopup = false;
  imageUrl = 'url("/assets/img-upload.png")';
  myForm: FormGroup;

  @Output() fetchData: EventEmitter<any> = new EventEmitter();
  constructor(private sharedService: SharedService) {
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      readyInMinutes: new FormControl('', Validators.required),
      cuisine: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });
  }
  show() {
    this.showPopup = true;
  }

  hidePopup() {
    this.showPopup = false;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl =`url(${reader.result as string})` ;
      console.log(this.imageUrl)
    };
    this.myForm.patchValue({
      image: file
    })
    this.myForm.controls['image'].setErrors(null)
    // Add your code to process the selected file here
  }

  handleSubmit(e: any){
    console.log(this.myForm.errors)

    console.log();
    const formData = new FormData()
    const {image, ...recipeData} = this.myForm.value
    formData.append("recipeData", JSON.stringify(recipeData))
    formData.append("file", image)
    this.sharedService.sendRecipe(formData).subscribe((value) => {
      this.hidePopup()
      this.fetchData.emit()
      this.myForm.reset()
      this.imageUrl = 'url("/assets/img-upload.png")';
    },(error) => {
      console.log(error);
      window.alert("Recipe not saved due to an Error! Contact support")
    })

  }

}

