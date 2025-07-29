import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getTechniqueTheme,
  getAllTechniqueThemes,
  getThemesByCategory,
  generateThemeCSS,
  applyThemeToElement,
  removeThemeFromElement,
  useTechniqueTheme,
  validateTheme,
  validateAllThemes,
  techniqueThemes,
  defaultTechniqueTheme
} from '../theme-manager';

// Mock DOM element
class MockHTMLElement {
  style: { [key: string]: string } = {};
  classList: {
    add: ReturnType<typeof vi.fn>;
    remove: ReturnType<typeof vi.fn>;
  };

  constructor() {
    this.classList = {
      add: vi.fn(),
      remove: vi.fn()
    };
  }

  setProperty(property: string, value: string) {
    this.style[property] = value;
  }

  removeProperty(property: string) {
    delete this.style[property];
  }
}

// Mock React hook
vi.mock('react', () => ({
  default: {
    useMemo: (fn: () => any) => fn()
  }
}));

describe('Theme Manager', () => {
  let mockElement: MockHTMLElement;

  beforeEach(() => {
    mockElement = new MockHTMLElement();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getTechniqueTheme', () => {
    it('should return correct theme for existing technique', () => {
      const theme = getTechniqueTheme('effet-miroir');
      
      expect(theme.id).toBe('effet-miroir');
      expect(theme.name).toBe('L\'effet miroir');
      expect(theme.colors.primary).toBe('#4F46E5');
      expect(theme.icon).toBe('🪞');
      expect(theme.category).toBe('psychology');
    });

    it('should return default theme for non-existing technique', () => {
      const theme = getTechniqueTheme('non-existing-technique');
      
      expect(theme).toEqual(defaultTechniqueTheme);
      expect(theme.id).toBe('default');
      expect(theme.name).toBe('Technique de négociation');
    });

    it('should return default theme for empty string', () => {
      const theme = getTechniqueTheme('');
      
      expect(theme).toEqual(defaultTechniqueTheme);
    });

    it('should return default theme for undefined', () => {
      const theme = getTechniqueTheme(undefined as any);
      
      expect(theme).toEqual(defaultTechniqueTheme);
    });
  });

  describe('getAllTechniqueThemes', () => {
    it('should return all available themes', () => {
      const themes = getAllTechniqueThemes();
      
      expect(themes).toHaveLength(7);
      expect(themes.map(t => t.id)).toContain('effet-miroir');
      expect(themes.map(t => t.id)).toContain('silence-strategique');
      expect(themes.map(t => t.id)).toContain('negociation-raisonnee');
    });

    it('should return themes with all required properties', () => {
      const themes = getAllTechniqueThemes();
      
      themes.forEach(theme => {
        expect(theme).toHaveProperty('id');
        expect(theme).toHaveProperty('name');
        expect(theme).toHaveProperty('colors');
        expect(theme).toHaveProperty('gradient');
        expect(theme).toHaveProperty('icon');
        expect(theme).toHaveProperty('className');
        expect(theme).toHaveProperty('category');
      });
    });
  });

  describe('getThemesByCategory', () => {
    it('should return themes for psychology category', () => {
      const psychologyThemes = getThemesByCategory('psychology');
      
      expect(psychologyThemes.length).toBeGreaterThan(0);
      psychologyThemes.forEach(theme => {
        expect(theme.category).toBe('psychology');
      });
      
      expect(psychologyThemes.map(t => t.id)).toContain('effet-miroir');
      expect(psychologyThemes.map(t => t.id)).toContain('silence-strategique');
    });

    it('should return themes for closing category', () => {
      const closingThemes = getThemesByCategory('closing');
      
      expect(closingThemes.length).toBeGreaterThan(0);
      closingThemes.forEach(theme => {
        expect(theme.category).toBe('closing');
      });
      
      expect(closingThemes.map(t => t.id)).toContain('oui-progressif');
      expect(closingThemes.map(t => t.id)).toContain('concession-calculee');
    });

    it('should return empty array for non-existing category', () => {
      const themes = getThemesByCategory('non-existing' as any);
      
      expect(themes).toHaveLength(0);
    });
  });

  describe('generateThemeCSS', () => {
    it('should generate correct CSS variables', () => {
      const theme = getTechniqueTheme('effet-miroir');
      const cssVars = generateThemeCSS(theme);
      
      expect(cssVars).toEqual({
        '--technique-primary': '#4F46E5',
        '--technique-secondary': '#6366F1',
        '--technique-accent': '#8B5CF6',
        '--technique-particle': '#4F46E5',
        '--technique-gradient-from': 'from-indigo-600',
        '--technique-gradient-via': 'via-blue-500/10',
        '--technique-gradient-to': 'to-primary-bg'
      });
    });

    it('should generate CSS variables for all themes', () => {
      const themes = getAllTechniqueThemes();
      
      themes.forEach(theme => {
        const cssVars = generateThemeCSS(theme);
        
        expect(cssVars).toHaveProperty('--technique-primary');
        expect(cssVars).toHaveProperty('--technique-secondary');
        expect(cssVars).toHaveProperty('--technique-accent');
        expect(cssVars).toHaveProperty('--technique-particle');
        expect(cssVars).toHaveProperty('--technique-gradient-from');
        expect(cssVars).toHaveProperty('--technique-gradient-via');
        expect(cssVars).toHaveProperty('--technique-gradient-to');
      });
    });
  });

  describe('applyThemeToElement', () => {
    it('should apply CSS variables to element', () => {
      const theme = getTechniqueTheme('effet-miroir');
      const element = mockElement as any;
      
      // Mock setProperty method
      element.style.setProperty = vi.fn();
      
      applyThemeToElement(element, theme);
      
      expect(element.style.setProperty).toHaveBeenCalledWith('--technique-primary', '#4F46E5');
      expect(element.style.setProperty).toHaveBeenCalledWith('--technique-secondary', '#6366F1');
      expect(element.style.setProperty).toHaveBeenCalledWith('--technique-accent', '#8B5CF6');
      expect(element.classList.add).toHaveBeenCalledWith('theme-effet-miroir');
    });

    it('should apply all CSS variables', () => {
      const theme = getTechniqueTheme('silence-strategique');
      const element = mockElement as any;
      
      element.style.setProperty = vi.fn();
      
      applyThemeToElement(element, theme);
      
      expect(element.style.setProperty).toHaveBeenCalledTimes(7); // 7 CSS variables
      expect(element.classList.add).toHaveBeenCalledWith('theme-silence-strategique');
    });
  });

  describe('removeThemeFromElement', () => {
    it('should remove CSS variables from element', () => {
      const theme = getTechniqueTheme('effet-miroir');
      const element = mockElement as any;
      
      element.style.removeProperty = vi.fn();
      
      removeThemeFromElement(element, theme);
      
      expect(element.style.removeProperty).toHaveBeenCalledWith('--technique-primary');
      expect(element.style.removeProperty).toHaveBeenCalledWith('--technique-secondary');
      expect(element.style.removeProperty).toHaveBeenCalledWith('--technique-accent');
      expect(element.classList.remove).toHaveBeenCalledWith('theme-effet-miroir');
    });

    it('should remove all CSS variables', () => {
      const theme = getTechniqueTheme('negociation-raisonnee');
      const element = mockElement as any;
      
      element.style.removeProperty = vi.fn();
      
      removeThemeFromElement(element, theme);
      
      expect(element.style.removeProperty).toHaveBeenCalledTimes(7);
      expect(element.classList.remove).toHaveBeenCalledWith('theme-negociation-raisonnee');
    });
  });

  describe('useTechniqueTheme', () => {
    it('should return theme utilities', () => {
      const result = useTechniqueTheme('effet-miroir');
      
      expect(result).toHaveProperty('theme');
      expect(result).toHaveProperty('cssVars');
      expect(result).toHaveProperty('applyTheme');
      expect(result).toHaveProperty('removeTheme');
      
      expect(result.theme.id).toBe('effet-miroir');
      expect(result.cssVars).toHaveProperty('--technique-primary');
    });

    it('should provide working apply and remove functions', () => {
      const result = useTechniqueTheme('ancrage-tactique');
      const element = mockElement as any;
      
      element.style.setProperty = vi.fn();
      element.style.removeProperty = vi.fn();
      
      // Test apply
      result.applyTheme(element);
      expect(element.classList.add).toHaveBeenCalledWith('theme-ancrage-tactique');
      
      // Test remove
      result.removeTheme(element);
      expect(element.classList.remove).toHaveBeenCalledWith('theme-ancrage-tactique');
    });
  });

  describe('validateTheme', () => {
    it('should validate correct theme', () => {
      const theme = getTechniqueTheme('effet-miroir');
      const isValid = validateTheme(theme);
      
      expect(isValid).toBe(true);
    });

    it('should reject theme with missing fields', () => {
      const invalidTheme = {
        id: 'test',
        name: 'Test',
        // Missing colors, gradient, etc.
      } as any;
      
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const isValid = validateTheme(invalidTheme);
      
      expect(isValid).toBe(false);
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });

    it('should reject theme with missing colors', () => {
      const invalidTheme = {
        id: 'test',
        name: 'Test',
        colors: {
          primary: '#000',
          // Missing secondary, accent, particle
        },
        gradient: { from: 'test', via: 'test', to: 'test' },
        icon: '🎯',
        className: 'test',
        category: 'psychology'
      } as any;
      
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const isValid = validateTheme(invalidTheme);
      
      expect(isValid).toBe(false);
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });

    it('should reject theme with missing gradient parts', () => {
      const invalidTheme = {
        id: 'test',
        name: 'Test',
        colors: {
          primary: '#000',
          secondary: '#111',
          accent: '#222',
          particle: '#333'
        },
        gradient: {
          from: 'test',
          // Missing via, to
        },
        icon: '🎯',
        className: 'test',
        category: 'psychology'
      } as any;
      
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const isValid = validateTheme(invalidTheme);
      
      expect(isValid).toBe(false);
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });
  });

  describe('validateAllThemes', () => {
    it('should validate all predefined themes', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const allValid = validateAllThemes();
      
      expect(allValid).toBe(true);
      expect(consoleSpy).not.toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });

    it('should detect invalid themes in collection', () => {
      // Temporarily modify a theme to make it invalid
      const originalTheme = techniqueThemes['effet-miroir'];
      (techniqueThemes as any)['effet-miroir'] = { id: 'invalid' };
      
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const allValid = validateAllThemes();
      
      expect(allValid).toBe(false);
      expect(consoleSpy).toHaveBeenCalled();
      
      // Restore original theme
      techniqueThemes['effet-miroir'] = originalTheme;
      consoleSpy.mockRestore();
    });
  });

  describe('Theme consistency', () => {
    it('should have unique IDs for all themes', () => {
      const themes = getAllTechniqueThemes();
      const ids = themes.map(t => t.id);
      const uniqueIds = [...new Set(ids)];
      
      expect(ids).toHaveLength(uniqueIds.length);
    });

    it('should have unique class names for all themes', () => {
      const themes = getAllTechniqueThemes();
      const classNames = themes.map(t => t.className);
      const uniqueClassNames = [...new Set(classNames)];
      
      expect(classNames).toHaveLength(uniqueClassNames.length);
    });

    it('should have valid hex colors', () => {
      const themes = getAllTechniqueThemes();
      const hexColorRegex = /^#[0-9A-F]{6}$/i;
      
      themes.forEach(theme => {
        expect(theme.colors.primary).toMatch(hexColorRegex);
        expect(theme.colors.secondary).toMatch(hexColorRegex);
        expect(theme.colors.accent).toMatch(hexColorRegex);
        expect(theme.colors.particle).toMatch(hexColorRegex);
      });
    });

    it('should have valid Tailwind gradient classes', () => {
      const themes = getAllTechniqueThemes();
      
      themes.forEach(theme => {
        expect(theme.gradient.from).toMatch(/^from-/);
        expect(theme.gradient.via).toMatch(/^via-/);
        expect(theme.gradient.to).toMatch(/^to-/);
      });
    });

    it('should have valid category values', () => {
      const themes = getAllTechniqueThemes();
      const validCategories = ['closing', 'psychology', 'preparation', 'objection-handling'];
      
      themes.forEach(theme => {
        expect(validCategories).toContain(theme.category);
      });
    });

    it('should have emoji icons', () => {
      const themes = getAllTechniqueThemes();
      
      themes.forEach(theme => {
        expect(theme.icon).toMatch(/[\u{1F000}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u);
      });
    });
  });

  describe('Performance', () => {
    it('should handle multiple theme applications efficiently', () => {
      const theme = getTechniqueTheme('effet-miroir');
      const elements = Array.from({ length: 100 }, () => new MockHTMLElement());
      
      const start = performance.now();
      
      elements.forEach(element => {
        applyThemeToElement(element as any, theme);
      });
      
      const end = performance.now();
      const duration = end - start;
      
      // Should complete in reasonable time (less than 100ms for 100 elements)
      expect(duration).toBeLessThan(100);
    });

    it('should cache CSS variables generation', () => {
      const theme = getTechniqueTheme('effet-miroir');
      
      const start = performance.now();
      
      // Generate CSS variables multiple times
      for (let i = 0; i < 1000; i++) {
        generateThemeCSS(theme);
      }
      
      const end = performance.now();
      const duration = end - start;
      
      // Should be fast (less than 50ms for 1000 generations)
      expect(duration).toBeLessThan(50);
    });
  });

  describe('Edge cases', () => {
    it('should handle null element gracefully', () => {
      const theme = getTechniqueTheme('effet-miroir');
      
      expect(() => {
        applyThemeToElement(null as any, theme);
      }).toThrow();
    });

    it('should handle undefined theme gracefully', () => {
      const element = mockElement as any;
      
      expect(() => {
        applyThemeToElement(element, undefined as any);
      }).toThrow();
    });

    it('should handle theme with null colors', () => {
      const invalidTheme = {
        ...getTechniqueTheme('effet-miroir'),
        colors: null as any
      };
      
      expect(() => {
        generateThemeCSS(invalidTheme);
      }).toThrow();
    });
  });
});