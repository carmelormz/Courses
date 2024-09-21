import { useState } from 'react';

import ProjectsSidebar from './components/ProjectsSidebar';
import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import ProjectDetails from './components/ProjectDetails';

const INITIAL_PROJECTS_STATE = {
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
};

function App() {
  const [projectsState, setProjectsState] = useState(INITIAL_PROJECTS_STATE);

  /**
   * Handles add new project buttons clicks.
   */
  const handleStartAddProject = () => {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: null,
      };
    });
  };

  /**
   * Handles cancel button event click.
   */
  const handleCancel = () => {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
      };
    });
  };

  /**
   * Handles save of a new project.
   * @param {title, description, dueDate} projectData
   */
  const handleSave = (projectData) => {
    setProjectsState((prevProjectsState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };

      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
        projects: [...prevProjectsState.projects, newProject],
      };
    });
  };

  /**
   * Handles the selection of a project on the sidebar.
   * @param {number} projectId
   */
  const handleSelectProject = (projectId) => {
    setProjectsState((prevProjectsState) => {
      return {
        ...prevProjectsState,
        selectedProjectId: projectId,
      };
    });
  };

  /**
   * Handles the deletion of a project.
   */
  const handleDelete = () => {
    setProjectsState((prevProjectsState) => {
      const updatedProjects = prevProjectsState.projects.filter(
        (project) => project.id !== prevProjectsState.selectedProjectId
      );

      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
        projects: updatedProjects,
      };
    });
  };

  const handleAddTask = (task) => {
    setProjectsState((prevProjectsState) => {
      const newTask = {
        text: task,
        id: Math.random(),
        projectId: prevProjectsState.selectedProjectId,
      };

      return {
        ...prevProjectsState,
        tasks: [...prevProjectsState.tasks, newTask],
      };
    });
  };

  const handleDeleteTask = (taskId) => {
    setProjectsState((prevProjectsState) => {
      const updatedTasks = prevProjectsState.tasks.filter(
        (task) => task.id !== taskId
      );

      return {
        ...prevProjectsState,
        tasks: updatedTasks,
      };
    });
  };

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <ProjectDetails
      project={selectedProject}
      tasks={projectsState.tasks}
      onDelete={handleDelete}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onCancel={handleCancel} onSave={handleSave} />;
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className='h-screen my-8 flex gap-8'>
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelect={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
