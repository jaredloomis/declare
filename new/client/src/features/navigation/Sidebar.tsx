import React from 'react';
import { HiChartPie, HiDocumentText, HiCog, HiPlay } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export function Sidebar() {
  return (
    <div className='border-r border-r-gray-200'>
      <nav aria-label='Navigation Sidebar'>
        <ul>
          <li>
            <Link to='/'>
              <HiChartPie /> Dashboard
            </Link>
          </li>

          <li>
            <Link to='/tests'>
              <HiCog /> Tests
            </Link>
          </li>

          <li>
            <Link to='/suites'>
              <HiPlay /> Suites
            </Link>
          </li>

          <li>
            <Link to='/reports'>
              <HiDocumentText /> Reports
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
