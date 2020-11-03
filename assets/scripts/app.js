class Tooltip {}

class ProjectItem {
  constructor(id, updateProjectListFunction) {
    this.updateProjectList = updateProjectListFunction;
    this.id = id;
    this.connectSwitchButton();
    this.connectMoreInfoButton();
  }

  connectMoreInfoButton() {}

  connectSwitchButton() {
    const projectItemElement = document.getElementById(this.id);
    const switchBtn = projectItemElement.querySelector("button:last-of-type");
    switchBtn.addEventListener(
      "click",
      this.updateProjectList.bind(null, this.id)
    );
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    this.type = type;

    const prjItems = document.querySelectorAll(`#${type}-projects li`);
    for (const prjItem of prjItems) {
      this.projects.push(
        new ProjectItem(prjItem.id, this.switchProject.bind(this))
      );
    }
  }

  setSwithcHandlerFunction(addProjectFromOtherInstance) {
    this.switchHandler = addProjectFromOtherInstance;
  }

  addProject(project) {
    // console.log(project);
    console.log(this.projects);
  }

  switchProject(projectId) {
    // const projectIndex = this.projects.findIndex((p) => p.id === projectId);
    // this.projects.splice(projectIndex, 1);
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    // this.projects = this.projects.filter((p) => p.id === !projectId);
  }
}

class App {
  static init() {
    const activeProjectList = new ProjectList("active");
    const finishedProjectList = new ProjectList("finished");

    activeProjectList.setSwithcHandlerFunction(
      finishedProjectList.addProject.bind(finishedProjectList)
    );
    finishedProjectList.setSwithcHandlerFunction(
      activeProjectList.addProject.bind(activeProjectList)
    );
  }
}

App.init();
