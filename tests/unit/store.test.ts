import { describe, it, expect, beforeEach } from 'vitest';
import { useProductCatalogStore } from '../../lib/useProductCatalogStore';

describe('useProductCatalogStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useProductCatalogStore.setState({
      flowSpeed: 1.0,
      activeComponent: null,
      waterColor: '#1e90ff',
      isExploded: false,
    });
  });

  it('should initialize with default values', () => {
    const state = useProductCatalogStore.getState();
    expect(state.flowSpeed).toBe(1.0);
    expect(state.activeComponent).toBeNull();
    expect(state.waterColor).toBe('#1e90ff');
    expect(state.isExploded).toBe(false);
  });

  it('should update flowSpeed correctly', () => {
    useProductCatalogStore.getState().setFlowSpeed(2.5);
    expect(useProductCatalogStore.getState().flowSpeed).toBe(2.5);
  });

  it('should update activeComponent correctly', () => {
    useProductCatalogStore.getState().setActiveComponent('fitting');
    expect(useProductCatalogStore.getState().activeComponent).toBe('fitting');

    useProductCatalogStore.getState().setActiveComponent(null);
    expect(useProductCatalogStore.getState().activeComponent).toBeNull();
  });

  it('should update waterColor correctly', () => {
    useProductCatalogStore.getState().setWaterColor('#10ac84');
    expect(useProductCatalogStore.getState().waterColor).toBe('#10ac84');
  });

  it('should update isExploded correctly', () => {
    useProductCatalogStore.getState().setIsExploded(true);
    expect(useProductCatalogStore.getState().isExploded).toBe(true);

    useProductCatalogStore.getState().setIsExploded(false);
    expect(useProductCatalogStore.getState().isExploded).toBe(false);
  });
});
