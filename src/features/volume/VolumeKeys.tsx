import { changeVolume, VOLUME_STEP, volume } from '@/entities/volume';
import { t } from '@/shared/i18n';
import { useRemoteKeyHandler } from '@/shared/remote-navigation';
import { showToast } from '@/shared/ui';

// Volume keys work on every screen: +/- change the level by 5 and show a short toast.
export function VolumeKeys() {
  useRemoteKeyHandler((action) => {
    if (action !== 'volumeUp' && action !== 'volumeDown') return false;
    changeVolume(action === 'volumeUp' ? VOLUME_STEP : -VOLUME_STEP);
    showToast(t('volume.level', { percent: volume.value }), 1400);
    return true;
  });
  return null;
}
