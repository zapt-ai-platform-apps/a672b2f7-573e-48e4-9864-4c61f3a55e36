import { describe, it, expect } from 'vitest';
import createShapes from '../createShapes';

describe('createShapes', () => {
  it('should create shapes with valid type property', () => {
    const shapes = createShapes();
    
    // Verify each shape has a valid type
    shapes.forEach(shape => {
      expect(shape.type).to.be.oneOf(['circle', 'square']);
    });
  });

  it('should create between 8 and 12 shapes', () => {
    const shapes = createShapes();
    expect(shapes.length).to.be.at.least(8);
    expect(shapes.length).to.be.at.most(12);
  });

  it('should create shapes with all required properties', () => {
    const shapes = createShapes();
    
    shapes.forEach(shape => {
      expect(shape).to.have.property('id');
      expect(shape).to.have.property('top');
      expect(shape).to.have.property('left');
      expect(shape).to.have.property('size');
      expect(shape).to.have.property('opacity');
      expect(shape).to.have.property('blur');
      expect(shape).to.have.property('type');
      expect(shape).to.have.property('color');
      expect(shape).to.have.property('move');
      
      // Verify move object structure
      expect(shape.move).to.have.property('x');
      expect(shape.move).to.have.property('y');
      expect(shape.move).to.have.property('duration');
    });
  });
});