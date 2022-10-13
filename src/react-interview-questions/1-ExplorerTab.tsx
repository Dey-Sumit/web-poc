import { useState } from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi';
const Folder = ({ data, name }) => {
  console.log({ data });
  const [isCollapsed, setIsCollapsed] = useState(true);

  if (data.length === 0) {
    console.log('render');

    return <div className='folder'>{data.name}</div>;
  }

  return (
    <div className='pl-3'>
      <button
        className='flex items-center space-x-[2px]'
        onClick={() => setIsCollapsed((value) => !value)}
      >
        <HiOutlineChevronRight className={isCollapsed ? 'rotate-0' : 'rotate-90'} />
        <span>{name}</span>
      </button>
      {!isCollapsed &&
        data.map((item) => {
          return item.type === 'folder' ? (
            <Folder data={item.children} name={item.name} />
          ) : (
            <File name={item.name} />
          );
        })}
    </div>
  );
};

const File = ({ name }) => {
  return (
    <button className='block ml-4 my-[2px] cursor-pointer'>
      <span>{name}</span>
    </button>
  );
};

const ExplorerTab = () => {
  return (
    <div className='w-[190px]  h-screen p-2 text-gray-200 bg-gray-900  text-base [&>div]:pl-0'>
      {Data.map((item) => {
        return item.type === 'folder' ? (
          <Folder data={item.children} name={item.name} />
        ) : (
          <File name={item.name} />
        );
      })}
    </div>
  );
};
export default ExplorerTab;

/**
type Entity = {
    id: string;
    type: 'file' | 'folder';
    name: string;
    children?: Entity[]; // only for folders
    // If the entity is a folder , I need to recursively render its children
    // recursion ends when the entity is a file or when it has no children
}
Array<Entity>
 */

type Entity = {
  id: string;
  type: 'file' | 'folder';
  name: string;
  children?: Entity[]; // only for folders
  // If the entity is a folder , I need to recursively render its children
  // recursion ends when the entity is a file or when it has no children
};

const Data: Array<Entity> = [
  {
    id: '1',
    type: 'folder',
    name: 'folder1',
    children: [
      {
        id: '2',
        type: 'file',
        name: 'file1.tsx',
      },
      {
        id: '3',
        type: 'folder',
        name: 'folder2',
        children: [
          {
            id: '4',
            type: 'file',
            name: 'file2.tsx',
          },
          {
            id: '5',
            type: 'file',
            name: 'file3.tsx',
          },
        ],
      },
    ],
  },
  {
    id: '6',
    type: 'folder',
    name: 'folder3',
    children: [
      {
        id: '7',
        type: 'file',
        name: 'file4.tsx',
      },
    ],
  },
];
