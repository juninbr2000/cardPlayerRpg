 import styles from "./CampaignCard.module.css";
import { type campaignCreate } from "../../types/campaign";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

interface CampaignCardProps {
  campaign: campaignCreate;
}

function CampaignCard({ campaign }: CampaignCardProps) {
  const navigate = useNavigate()
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{campaign.name}</h3>
        <span className={styles.system}>{campaign.system}</span>
      </div>

      <p className={styles.description}>{campaign.description}</p>

      <div className={styles.footer}>
        <p className={styles.master}>
          Mestre: <strong>{campaign.masterName}</strong>
        </p>
        <Button
          title="Ver Detalhes"
          variant="secondary"
          type="button"
          action={() => navigate(`/campaign/${campaign.id}`)}
        />
      </div>
    </div>
  );
}

export default CampaignCard;
