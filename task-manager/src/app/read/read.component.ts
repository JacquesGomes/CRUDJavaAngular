import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  items: any[] = [];

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
}
