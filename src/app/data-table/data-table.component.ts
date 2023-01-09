import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import sortArray from 'sort-array'
import { TableColumn } from '../shared/models/TableColumn';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() hasCheck: boolean = true;
  @Input() expandable = false;
  @Input() maxItems = 10;

  @Output() onExpand = new EventEmitter<number>();
  @Output() onCheck = new EventEmitter<number[]>();

  allChecked = false
  checkedIds:any[] = []
  showData: any[] = []

  totalItems = 0;
  nbPages = 0;
  currentPage = 1;
  pagesArray: number[] = [];
  sortBy: any = {}

  maxPageDisplay = 5;

  constructor() { }

  ngOnInit(): void {
    this.totalItems = this.data.length;
    this.nbPages = Math.ceil(this.totalItems / this.maxItems);

    if (this.nbPages >= this.maxPageDisplay) {
      for (let index = 1; index <= this.maxPageDisplay; index++) {
        this.pagesArray.push(index)
      }
    }
    else {
      for (let index = 1; index <= this.nbPages; index++) {
        this.pagesArray.push(index)
      }
    }

    this.loadData()
  }

  loadData(){
    this.showData = [];

    //Ordonner
    if (Object.keys(this.sortBy).length === 1) {
      let property = Object.keys(this.sortBy)[0];
      sortArray(this.data, {by: property,order: this.sortBy[property]})
    }

    //Filter by page
    let start = ((this.currentPage - 1) * 10);

    for (let i = start; i < start+this.maxItems; i++) {
      if(this.data[i] !== undefined){
        this.showData.push(this.data[i]);
      }
      else{
        break;
      }
    }
  }

  checkOne(ev: any, row: any) {
    let isChecked = ev.currentTarget.checked;
    let tableCheck: any = document.querySelector('.tableCheck')
    let checkboxes: any = document.querySelectorAll(".rowCheck");

    if (isChecked) {
      for (let index = 0; index < checkboxes.length; index++) {
        if (!checkboxes[index].checked) {
          tableCheck.checked = false;
          break;
        }
        tableCheck.checked = true;
      }

      if (this.checkedIds.length === this.showData.length) {
        tableCheck.checked = true;
      }
      else {
        tableCheck.checked = false;
      }

      if(row.id !== undefined){
        this.checkedIds.push(row.id)
        this.onCheck.emit(this.checkedIds)
      }
    }
    else {
      tableCheck.checked = false;
      this.allChecked = false
      if(row.id !== undefined){
        this.checkedIds = this.checkedIds.filter(e => e !== row.id)
        this.onCheck.emit(this.checkedIds)
      }
    }
  }

  checkAll(ev: any) {
    let isChecked = ev.currentTarget.checked;

    let checkboxes: any = document.querySelectorAll(".rowCheck");

    if (isChecked) {
      for (let index = 0; index < checkboxes.length; index++) {
        checkboxes[index].checked = true;
      }
      this.checkedIds = this.data.map((x)=>{return x.id;});
      this.allChecked = true
    }
    else {
      for (let index = 0; index < checkboxes.length; index++) {
        checkboxes[index].checked = false;
      }

      this.checkedIds = [];
      this.allChecked = false
    }

    this.onCheck.emit(this.checkedIds)

  }

  expand(id: number) {
    if (this.expandable) {
      this.onExpand.emit(id);
    }
  }

  changePage(page: any) {
    if (this.currentPage !== page) {
      this.currentPage = page

      if (this.currentPage >= this.maxPageDisplay) {
        let start = 2 + (this.currentPage - this.maxPageDisplay)
        this.pagesArray = []

        for (let index = start; index <= this.currentPage + 1; index++) {
          if (index == this.nbPages + 1) {
            break;
          }
          this.pagesArray.push(index)
        }
      }
      else if (this.currentPage === this.pagesArray[0] && this.currentPage !== 1) {
        let start = this.currentPage - 1

        if (start == 0) {
          start = 1;
        }

        let end = this.pagesArray[this.pagesArray.length - 1] - 1;
        this.pagesArray = []

        for (let index = start; index <= end; index++) {

          this.pagesArray.push(index)
        }
      }

      this.loadData();
    }

  }

  sortData(el: any,column: any){
    if (column.sortable) {
      let ascArrow = "<span class='material-icons v-middle'>arrow_drop_up</span>"
      let descArrow = "<span class='material-icons v-middle'>arrow_drop_down</span>"
      let element = el.currentTarget

      if(Object.keys(this.sortBy).length === 0){
        element.insertAdjacentHTML('beforeend', ascArrow)

        this.sortBy = {
          [column.property]: 'asc'
        }
      }
      else{
        if(Object.keys(this.sortBy).includes(column.property)){
          element.removeChild(element.lastChild);
          if(this.sortBy[column.property] === 'asc'){
            element.insertAdjacentHTML('beforeend', descArrow)

            this.sortBy = {
              [column.property]: 'desc'
            }
          }
          else {
            element.insertAdjacentHTML('beforeend', ascArrow)

            this.sortBy = {
              [column.property]: 'asc'
            }
          }
        }
        else {
          let currentSorting = document.querySelector('table thead tr th span');
          currentSorting?.remove();

          element.insertAdjacentHTML('beforeend', ascArrow)

          this.sortBy = {
            [column.property]: 'asc'
          }
        }
      }

      this.changePage(1)
      this.loadData()
    }
  }

  isCheck(id: number){
    return this.checkedIds.includes(id);
  }

}
