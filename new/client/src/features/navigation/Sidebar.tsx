import React from 'react';
import { Sidebar as FbSidebar } from 'flowbite-react';
import { HiChartPie, HiDocumentText, HiCog, HiPlay } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export function Sidebar() {
  return (
    <div className='border-r border-r-gray-200'>
      <FbSidebar aria-label='Navigation Sidebar'>
        <FbSidebar.Items>
          <FbSidebar.ItemGroup>
            <Link to='/'>
              <FbSidebar.Item icon={HiChartPie}>Dashboard</FbSidebar.Item>
            </Link>
            <Link to='/tests'>
              <FbSidebar.Item icon={HiCog} label='Pro' labelColor='dark'>
                Tests
              </FbSidebar.Item>
            </Link>
            <Link to='/suites'>
              <FbSidebar.Item icon={HiPlay} label='3'>
                Suites
              </FbSidebar.Item>
            </Link>
            <Link to='/reports'>
              <FbSidebar.Item icon={HiDocumentText}>Reports</FbSidebar.Item>
            </Link>
          </FbSidebar.ItemGroup>
        </FbSidebar.Items>
      </FbSidebar>
    </div>
  );
}
