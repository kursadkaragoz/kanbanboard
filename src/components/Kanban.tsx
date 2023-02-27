
import { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import Card from './Card'

const data  = [
    {
        id: uuidv4(),
        title: 'Backlog',
        tasks: [
            {
                id: uuidv4(),
                title: 'Task 1'
            },
            {
                id: uuidv4(),
                title: 'Task 2'
            },
            {
                id: uuidv4(),
                title: 'Task 3'
            },
        ]
    },
    {
        id: uuidv4(),
        title: 'To-Do',
        tasks: [
            {
                id: uuidv4(),
                title: 'Task 4'
            },
            {
                id: uuidv4(),
                title: 'Task 5'
            }
        ]
    },
    {
        id: uuidv4(),
        title: 'In Progress',
        tasks: [
            {
                id: uuidv4(),
                title: 'Task 6'
            }
        ]
    },
    {
        id: uuidv4(),
        title: 'Testing',
        tasks: [
            {
                id: uuidv4(),
                title: 'Task 7'
            },
            {
                id: uuidv4(),
                title: 'Task 8'
            }
        ]
    },
    {
        id: uuidv4(),
        title: 'Deployment',
        tasks: [
            {
                id: uuidv4(),
                title: 'Task 9'
            }
        ]
    },
    {
        id: uuidv4(),
        title: 'Done',
        tasks: [
            {
                id: uuidv4(),
                title: 'Task 10'
            }
        ]
    },
]

export default function Kanban() {

    const [tasks, setTasks] = useState(data);
    const onDragEnd = (result : DropResult) => {
        if (!result.destination) return
        const { source, destination } = result

        if (source.droppableId !== destination.droppableId) {
            const srcColIdx = tasks.findIndex(e => e.id === source.droppableId)
            const destinationColIdx = tasks.findIndex(e => e.id === destination.droppableId)

            const srcCol = tasks[srcColIdx]
            const destinationCol = tasks[destinationColIdx]

            const srcTask = [ {...srcCol.tasks }]
            const destinationTask = [ { ...destinationCol.tasks }]

            const [remove] = srcTask.splice(source.index, 1)
            destinationTask.splice(destination.index, 0, remove)

            tasks[srcColIdx].tasks = srcTask
            tasks[destinationColIdx].tasks = destinationTask

            setTasks(tasks)
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex items-start">
                {
                    tasks.map(section=> (
                        <Droppable
                            key={section.id}
                            droppableId={section.id}
                        >
                            {(provided) => (
                                <div 
                                    {...provided.droppableProps}
                                    className="w-40 bg-red p-2 rounded-lg bg"
                                    ref={provided.innerRef}
                                >
                                    <div className="m-2 text-lg font-bold">
                                        {section.title}
                                    </div>
                                    <div className="">
                                        {
                                            section.tasks.map((task, index: number) => (
                                                <Draggable
                                                    key={task.id}
                                                    draggableId={task.id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                ...provided.draggableProps.style,
                                                                opacity: snapshot.isDragging ? '0.5' : '1'
                                                            }}
                                                        >
                                                            <Card>
                                                                {task.title}
                                                            </Card>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))
                                        }
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))
                }
            </div>
        </DragDropContext>
    )
}
