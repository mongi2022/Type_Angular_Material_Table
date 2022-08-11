import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NewprojectService } from './newproject.service';
import { Project } from './project';


let names2: string[]
let paths: string[]
@Component({
  selector: 'app-newproject',
  templateUrl: './newproject.component.html',
  styleUrls: ['./newproject.component.css'],
})
export class NewProjectComponent implements OnInit {
  displayedColumns: string[] = ['id', 'ProjectName', 'ProjectPath'];
  dataSource!: MatTableDataSource<Project>;

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort;

  project!: Project
  show2=true
  path2!:string
  projects!:Project[];
  projects2!:any;
  projectForm= new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      project_path:new FormControl('', [Validators.required])
    });

  fileOutput: any;
  constructor(private newProjectService: NewprojectService,private router:Router,public formBuilder: FormBuilder) {

     this.formBuilder.group(this.projectForm)

    // Create 100 users
  //  const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
  //  this.dataSource = new MatTableDataSource(users);
    //  console.log(users);
      

  }

  createProjectController() {
    this.newProjectService
      .createProjectService(this.projectForm.value)
      .subscribe((data) => {
        console.log(data);
       this.getAllProjectController()
         
      });
    
  }
 
  ngOnInit(): void {
    this.getAllProjectController()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllProjectController(){
    this.newProjectService.getAllProjectService().subscribe((data)=>{
     this.projects= Object.values(data)

     this.projects2=this.projects[0]
     names2=this.projects2['name']
     names2=this.projects2.map((x:any)=>x.name)
     paths=this.projects2.map((x:any)=>x.project_path)
     const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    
     this.dataSource = new MatTableDataSource(users);
    console.log(users);
     this.dataSource.paginator = this.paginator;

     this.dataSource.sort = this.sort;
    // console.log(names2);
    // console.log(NAMES);
    // console.log(FRUITS);
    // console.log(paths);



     

      
    })
  }

 

  onChange(event:any) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (e: any) => {
      // The file's text will be printed here
      this.fileOutput = e.target.result;
      for (var i = 0; i < file.length; ++i) {
        if(!(file[i].webkitRelativePath.split('/').length > 2)){
            console.log(file);
            
        }
    };
    console.log(file);
    
}
}

startProject(path:string,_id:string){
  
  localStorage.setItem('path',path)
  localStorage.setItem('id_project',_id)

  this.router.navigate(['/dash/project/upload'])
}

}
function createNewUser(id: number): Project {

  const ProjectName =
    names2[Math.round(Math.random() * (names2.length - 1))] +
    ' ' +
    names2[Math.round(Math.random() * (names2.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: ProjectName,
  //  ProjectDescription: Math.round(Math.random() * 100).toString(),
    project_path: paths[Math.round(Math.random() * (paths.length - 1))]
  };
}