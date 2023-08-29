import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  items: any[] = [];
  
  title: string = '';
  description: string = '';
  
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getItems().subscribe((data) => {
      this.items = data;
    });
  }

  isEditModalOpen: boolean = false;
  selectedItem: any;

  openEditModal(item: any): void {
    this.isEditModalOpen = true;
    this.selectedItem = item;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedItem = null;
  }

  updateItem(): void {
    // Call the update method from the DataService
    this.dataService.updateItem(this.selectedItem.id, this.selectedItem).subscribe((updatedItem) => {
      // Handle the updated item if needed
      // For example, you could update the local items array
      const index = this.items.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        this.items[index] = updatedItem;
      }

      // Close the modal after updating
      this.closeEditModal();
    });
  }

  deleteItem(id: number): void{
    
    this.dataService.deleteItem(id).subscribe((deletedItem) =>{
      const index = this.items.findIndex(item => item.id === id);
      if(index !== -1){
        this.items = this.items.filter(item => item.id !== id)
      }

    })
  }

  createItem(): void {
    // Validate input fields before proceeding
    if (!this.title || !this.description) {
      alert('Please fill in all fields.');
      return;
    }

    const newTarefa = {
      
      title: this.title,
      description: this.description
    };

    this.dataService.createItem(newTarefa).subscribe(
      (createdTarefa) => {
        // Handle the created tarefa if needed
        console.log('Tarefa created:', createdTarefa);

        this.items.push(createdTarefa);

        // Clear form fields after successful creation
        
        this.title = '';
        this.description = '';
      },
      (error) => {
        // Handle error if the creation fails
        console.error('Error creating tarefa:', error);
      }
    );
  }
  

}
