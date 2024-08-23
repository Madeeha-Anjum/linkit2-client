import * as React from 'react';

import ModeToggle from './ModeToggle';
import { Button } from './ui/button';

export default function Header() {
  return (
    <>
      <nav className="flex items-center justify-between px-6">
        <ul>
          <Button variant="link">Linkit2</Button>
        </ul>
        <ul className="flex items-center space-x-3 *:py-3">
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </>
  );
}
