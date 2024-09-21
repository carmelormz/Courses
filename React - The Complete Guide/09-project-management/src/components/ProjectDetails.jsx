import Tasks from './Tasks';

const ProjectDetails = ({
  project,
  tasks,
  onDelete,
  onAddTask,
  onDeleteTask,
}) => {
  const formattedProjectDate = new Date(project.dueDate).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  );

  const projectTasks = tasks.filter((task) => task.projectId === project.id);

  return (
    <div className='w-[35rem] mt-16'>
      <header className='pb-4 mb-4 border-b-2 border-stone-300'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold text-stone-600 mb-2'>
            {project.title}
          </h1>
          <button
            className='text-stone-600 hover:text-stone-950'
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
        <p className='mb-4 text-stone-400'>{formattedProjectDate}</p>
        <p className='text-stone-600 whitespace-pre-wrap'>
          {project.description}
        </p>
      </header>
      <Tasks tasks={projectTasks} onAdd={onAddTask} onDelete={onDeleteTask} />
    </div>
  );
};

export default ProjectDetails;
