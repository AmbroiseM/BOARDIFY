import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Avatar, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";

const { Column } = Table;

interface Task {
  key: string;
  name: string;
  description: string;
  assignee: string;
  point: number;
  priority: string;
  order: string;
}

const DraggableRow = ({ children, ...props }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  return (
    <tr
      {...props}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </tr>
  );
};

interface Props {
  name: string;
}

export default function Sprint({ name }: Props) {
  const [totalPoints, setTotalPoints] = useState(0);
  const [data, setData] = useState<Task[]>([
    {
      key: "1",
      name: "Design of the UserPage UI",
      description: "Lorum ipsum dolor sit amet consectetur adipiscing elit",
      assignee: "Valentin",
      point: Math.floor(Math.random() * 8) + 1,
      priority: "high",
      order: "1",
    },
    {
      key: "2",
      name: "Delete a user",
      description: "Lorum ipsum dolor sit amet consectetur adipiscing elit",
      assignee: "Bouchra",
      point: Math.floor(Math.random() * 8) + 1,
      priority: "medium",
      order: "2",
    },
    {
      key: "3",
      name: "Assign a user to a project",
      description: "Lorum ipsum dolor sit amet consectetur adipiscing elit",
      assignee: "Laurent",
      point: Math.floor(Math.random() * 8) + 1,
      priority: "medium",
      order: "3",
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    computeTotalPoints(data);
  }, [data]);

  function computeTotalPoints(data: Task[]) {
    let total = 0;
    data.forEach((task) => {
      total += task.point;
    });
    setTotalPoints(total);
  }

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setData((previous) => {
        const activeIndex = previous.findIndex((i) => i.order === active.id);
        const overIndex = previous.findIndex((i) => i.order === over?.id);
        const newData = arrayMove(previous, activeIndex, overIndex);
        const updateData = newData.map((task, index) => {
          return { ...task, order: index + 1 };
        });
        console.log(
          "Nouvel ordre des tâches:",
          updateData.map((task) => `${task.name} (ordre: ${task.order})`)
        );
        return newData;
      });
    }
  };

  return (
    <>
      <p style={{ fontWeight: "bold", fontSize: "19px" }}>
        {name} <span style={{ marginLeft: "10px" }}>{totalPoints} pts</span>
      </p>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={data.map((item) => item.order)}
          strategy={verticalListSortingStrategy}
        >
          <Table<Task>
            dataSource={data}
            pagination={false}
            style={{ marginBottom: "50px", borderBottom: "3px solid #C7C7C7" }}
            components={{
              body: {
                row: DraggableRow,
              },
            }}
          >
            <Column
              title="Name"
              dataIndex="name"
              key="name"
              render={(name: string) => (
                <span style={{ fontWeight: "500", color: "black" }}>
                  {name}
                </span>
              )}
            />
            <Column
              title="Description"
              dataIndex="description"
              key="description"
            />
            <Column
              title="Assignee"
              dataIndex="assignee"
              key="assignee"
              render={(assignee: string) => (
                <Avatar>{assignee.charAt(0)}</Avatar>
              )}
            />
            <Column
              title="Complexity"
              dataIndex="point"
              key="point"
              render={(point: number) => (
                <Tag
                  style={{ borderRadius: "50%", fontSize: "15px" }}
                  color="geekblue"
                >
                  {point}
                </Tag>
              )}
            />
            <Column
              title="Priority"
              dataIndex="priority"
              key="priority"
              render={(priority: string) => {
                let color = priority.length > 5 ? "geekblue" : "green";
                if (priority.toLowerCase() === "loser") {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={priority}>
                    {priority.toUpperCase()}
                  </Tag>
                );
              }}
            />
            <Column
              title="Action"
              key="action"
              render={(_: any, record: Task) => (
                <Space size="middle">
                  <a>Edit </a>
                  <a>Delete</a>
                </Space>
              )}
            />
          </Table>
        </SortableContext>
      </DndContext>
    </>
  );
}
