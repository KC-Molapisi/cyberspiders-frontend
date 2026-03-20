# BOCRA Database — Entity Relationship Diagram

```mermaid
erDiagram

    User {
        String   id               PK  "uuid"
        String   name
        String   email                "unique"
        String   password_hash
        Enum     role                 "CITIZEN | OPERATOR | ADMIN"
        DateTime created_at
    }

    Complaint {
        String   id               PK  "uuid"
        String   user_id          FK
        String   title
        String   description
        Enum     category             "CONSUMER_PROTECTION | LICENSING | SPECTRUM | POSTAL | BROADCASTING"
        Enum     status               "PENDING | IN_REVIEW | RESOLVED | REJECTED"
        String   reference_number     "unique — e.g. CMP-20240001"
        DateTime created_at
        DateTime updated_at
    }

    LicenseApplication {
        String   id               PK  "uuid"
        String   user_id          FK
        Enum     license_type         "OPERATOR | TYPE_APPROVAL | SPECTRUM | POSTAL | BROADCASTING"
        String   business_name
        String   contact_name
        String   contact_email
        Enum     status               "PENDING | UNDER_REVIEW | APPROVED | REJECTED"
        String   reference_number     "unique — e.g. LIC-20240001"
        DateTime submitted_at
        DateTime updated_at
    }

    Notice {
        Int      id               PK
        String   text
        Enum     type                 "REGULATORY | ALERT | INFO"
        Boolean  is_active
        DateTime created_at
    }

    Service {
        Int      id               PK
        String   title
        String   text
        Enum     category             "LICENSING | CONSUMER_PROTECTION | TYPE_APPROVAL | SPECTRUM | POSTAL | BROADCASTING"
        Boolean  is_active
    }

    AboutSlide {
        Int      id               PK
        String   kicker
        String   heading
        String   body
        Int      display_order
    }

    ContactEnquiry {
        String   id               PK  "uuid"
        String   name
        String   email
        String   subject
        String   message
        DateTime created_at
    }

    %% Relationships
    User ||--o{ Complaint          : "submits"
    User ||--o{ LicenseApplication : "applies for"
```

---

## Relationship Summary

| Relationship | Type | Description |
|---|---|---|
| User → Complaint | One-to-Many | A user can submit many complaints |
| User → LicenseApplication | One-to-Many | A user can submit many licence applications |
| Notice | Standalone | Seeded content, no FK |
| Service | Standalone | Seeded content, no FK |
| AboutSlide | Standalone | Seeded content, no FK |
| ContactEnquiry | Standalone | Public submissions, no user FK |

---

## Enum Reference

### User.role
| Value | Description |
|---|---|
| `CITIZEN` | General public user |
| `OPERATOR` | Licensed telecom/broadcast operator |
| `ADMIN` | BOCRA staff — full access |

### Complaint.category
| Value |
|---|
| `CONSUMER_PROTECTION` |
| `LICENSING` |
| `SPECTRUM` |
| `POSTAL` |
| `BROADCASTING` |

### Complaint.status
| Value | Meaning |
|---|---|
| `PENDING` | Submitted, not yet reviewed |
| `IN_REVIEW` | Assigned to a BOCRA officer |
| `RESOLVED` | Complaint closed successfully |
| `REJECTED` | Complaint not upheld |

### LicenseApplication.license_type
| Value |
|---|
| `OPERATOR` |
| `TYPE_APPROVAL` |
| `SPECTRUM` |
| `POSTAL` |
| `BROADCASTING` |

### LicenseApplication.status
| Value | Meaning |
|---|---|
| `PENDING` | Submitted, awaiting review |
| `UNDER_REVIEW` | Being assessed |
| `APPROVED` | Licence granted |
| `REJECTED` | Application denied |

### Notice.type
| Value | Meaning |
|---|---|
| `REGULATORY` | Official regulatory update |
| `ALERT` | Urgent public notice |
| `INFO` | General information |
```
