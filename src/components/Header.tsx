import * as React from 'react';

import ModeToggle from './ModeToggle';
import { Button } from './ui/button';

export default function Header() {
  return (
    <>
      <nav className="flex justify-between">
        <ul>
          <li>Linkit2</li>
        </ul>
        <ul className="flex space-x-3 items-center">
          <li>
            <Button variant="link">Link History</Button>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </>
  );
}
